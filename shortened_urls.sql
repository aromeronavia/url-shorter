DROP DATABASE IF EXISTS shortened_urls;
CREATE DATABASE shortened_urls;

\c shortened_urls;

CREATE TABLE short_url (
  id SERIAL PRIMARY KEY,
  hash varchar,
  original_url varchar,
  visits int
);
