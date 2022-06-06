class AddTxMetadata < ActiveRecord::Migration[7.0]
  def up
    add_column :transactions, :base_asset, :string
    add_column :transactions, :quote_asset, :string
    add_column :transactions, :price, :integer
    add_column :transactions, :side, :string
  end

  def down
    remove_column :transactions, :base_asset
    remove_column :transactions, :quote_asset
    remove_column :transactions, :price
    remove_column :transactions, :side
  end
end
