require 'json'
require 'byebug'

def get_token(credentials)
  store_new_token(credentials) unless File.exist? token_file
  file_content = File.read(token_file)

  if file_content.empty?
    return empty_token
  else
    token = JSON.parse(file_content)

    return empty_token unless token && token['expires_in']

    expires_in = File.ctime(token_file) + token['expires_in'] - 200

    return empty_token if Time.now > expires_in

    token.to_json
  end
end

def empty_token
  File.delete token_file
  '{}'
end

def token_file
  'token.json'
end

def api_access_point
  'https://developer.api.autodesk.com/authentication/v1/authenticate'
end

def new_token(client_id, client_secret, grant_type)
  `curl --data "client_id=#{client_id}&client_secret=#{client_secret}&grant_type=#{grant_type}" #{api_access_point} --header "Content-Type: application/x-www-form-urlencoded" -k`
end

def store_new_token(credentials)
  File.write(
    token_file,
    new_token(credentials['client_id'], credentials['client_secret'], credentials['grant_type'])
  )
end
