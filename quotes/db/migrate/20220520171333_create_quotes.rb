class CreateQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :quotes do |t|
      t.string :asset_id
      t.integer :price

      t.timestamps
    end
  end
end
