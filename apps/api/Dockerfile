FROM ruby:4.0.1 AS deps

RUN apt-get update -qq && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle config set frozen true && bundle install

FROM deps AS dev

COPY . .

EXPOSE 3001

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3001"]
