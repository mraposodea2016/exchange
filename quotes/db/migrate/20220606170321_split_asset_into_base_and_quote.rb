class SplitAssetIntoBaseAndQuote < ActiveRecord::Migration[7.0]
  def up
    rename_column :quotes, :asset_name, :base_asset
    add_column :quotes, :quote_asset, :string
  end

  def down
    rename_column :quotes, :base_asset, :asset_name
    remove_column :quotes, :quote_asset
  end
end
