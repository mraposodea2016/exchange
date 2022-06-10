class RenameTransactionColumnsAndRemoveSide < ActiveRecord::Migration[7.0]
  def up
    rename_column :transactions, :price, :quote_asset_price
    remove_column :transactions, :side
  end

  def down
    rename_column :transactions, :quote_asset_price, :price
    add_column :transaction, :side, :string
  end
end
