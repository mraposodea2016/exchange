class Transaction < ApplicationRecord
  validates :customer_id, presence: true
  validates :amount, presence: true, comparison: {greater_than: 0}
end
