class Transaction < ApplicationRecord
  validates :customer_id, presence: true
  validates :base_asset, presence: true
  validates :quote_asset, presence: true
  validates :quote_asset_price, presence: true, comparison: {greater_than: 0}
  validates :amount, presence: true, comparison: {greater_than: 0}
end
