/*
  # Add bids table and security policies

  1. New Tables
    - `bids`
      - `id` (uuid, primary key)
      - `amount` (decimal, required)
      - `created_at` (timestamp with timezone, auto)
      - `user_id` (uuid, foreign key to users)
      - `auction_id` (uuid, foreign key to auctions)

  2. Security
    - Enable RLS on `bids` table
    - Add policies for:
      - Anyone can view bids
      - Authenticated users can create bids
      - Users cannot modify or delete their bids
*/

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount decimal(10,2) NOT NULL CHECK (amount > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  auction_id uuid NOT NULL REFERENCES auctions(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view bids" ON bids
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create bids" ON bids
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM auctions
      WHERE id = auction_id
      AND status = 'ACTIVE'
      AND auth.uid() != seller_id
      AND end_date > now()
    )
    AND amount > (
      SELECT current_price
      FROM auctions
      WHERE id = auction_id
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bids_user ON bids(user_id);
CREATE INDEX IF NOT EXISTS idx_bids_auction ON bids(auction_id);
CREATE INDEX IF NOT EXISTS idx_bids_amount ON bids(amount);