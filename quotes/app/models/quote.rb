class Quote < ApplicationRecord
  validates :base_asset, presence: true
  validates :quote_asset, presence: true
  validates :price, presence: true, comparison: {greater_than: 0}
end
