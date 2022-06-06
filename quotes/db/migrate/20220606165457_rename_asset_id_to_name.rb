class RenameAssetIdToName < ActiveRecord::Migration[7.0]
  def up
    rename_column :quotes, :asset_id, :asset_name
  end

  def down
    rename_column :quotes, :asset_name, :asset_id
  end
end
