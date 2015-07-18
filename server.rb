require 'yaml'
require 'sinatra'
require 'rack/cors'
require_relative 'token.rb'

config_file = '.autodeskrc'
project_name = 'aechackathon'
unless File.exist? config_file
  raise RuntimeError, "No .autodeskrc file found in root directory"
end

config = YAML.load_file(config_file)

credentials = config[project_name]

use Rack::Cors do |config|
  config.allow do |allow|
    allow.origins 'localhost'
    allow.resource '/token.json', headers: :any
  end
end


unless credentials
  raise RuntimeError, "#{project_name} configuration missing in .autodeskrc"
end

get '/token.json' do
  content_type :json

  get_token(credentials)
end

