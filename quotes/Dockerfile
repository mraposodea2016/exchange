FROM ruby:3.1.2

RUN bundle config --global frozen 1

WORKDIR /exchange/quotes

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

COPY . .

CMD ["bundle", "exec", "rails", "s", "-p", "3000", "-b", "0.0.0.0"]