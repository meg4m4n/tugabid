/*
  # Create auctions table and security policies

  1. New Tables
    - `auctions`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `imageUrl` (text, optional)
      - `startPrice` (decimal, required)
      - `currentPrice` (decimal, required)
      - `startDate` (timestamp with timezone, required)
      - `endDate` (timestamp with timezone, required)
      - `status` (enum: PENDING, ACTIVE, COMPLETED, CANCELLED)
      - `createdAt` (timestamp with timezone, auto)
      - `updatedAt` (timestamp with timezone, auto)
      - `sellerId` (uuid, foreign key to users)

  2. Security
    - Enable RLS on `auctions` table
    - Add policies for:
      - Anyone can view active auctions
      - Authenticated users can create auctions
      - Sellers can update their own auctions
      - Sellers can delete their own auctions (if no bids)
*/

-- Create auction status enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE auction_status AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create auctions table
CREATE TABLE IF NOT EXISTS auctions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  start_price decimal(10,2) NOT NULL CHECK (start_price >= 0),
  current_price decimal(10,2) NOT NULL CHECK (current_price >= start_price),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL CHECK (end_date > start_date),
  status auction_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  seller_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  CONSTRAINT valid_price_range CHECK (current_price >= start_price)
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_auctions_updated_at
  BEFORE UPDATE ON auctions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active auctions" ON auctions
  FOR SELECT
  USING (status = 'ACTIVE');

CREATE POLICY "Authenticated users can create auctions" ON auctions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own auctions" ON auctions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own auctions" ON auctions
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = seller_id 
    AND NOT EXISTS (
      SELECT 1 FROM bids 
      WHERE auction_id = auctions.id
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status);
CREATE INDEX IF NOT EXISTS idx_auctions_seller ON auctions(seller_id);
CREATE INDEX IF NOT EXISTS idx_auctions_end_date ON auctions(end_date);