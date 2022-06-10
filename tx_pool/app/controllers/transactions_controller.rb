class TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all
    render json: @transactions
  end

  def new
    @transaction = Transaction.new
  end

  def create
    @transaction = Transaction.new(transaction_params)

    if @transaction.save
      render json: @transaction,
             status: :created
    else
      render json: @transaction.errors,
             status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:customer_id, :base_asset, :quote_asset, :quote_asset_price, :amount)
  end

end
