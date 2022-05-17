FROM ruby:3.1.2

RUN bundle config --global frozen 1

WORKDIR /exchange/tx_pool

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server"]