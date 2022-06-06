class QuotesController < ApplicationController
  def index
    @quotes = Quote.all
    render json: @quotes
  end

  def new
    @quote = Quote.new(quote_params)
  end

  def create
    @quote = Quote.new(quote_params)
    if @quote.save
      render json: @quote,
             status: :created
    else
      render json: @quote.errors,
             status: :unprocessable_entity
    end
  end

  private

  def quote_params
    params.require(:quote).permit(:base_asset, :quote_asset, :price)
  end

end
