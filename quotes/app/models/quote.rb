class Quote < ApplicationRecord
  validates :asset_id, presence: true
  validates :price, presence: true, comparison: {greater_than: 0}
end
