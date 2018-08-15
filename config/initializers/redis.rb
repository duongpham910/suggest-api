$redis = Redis::Namespace.new "suggest",
  :redis => Redis.new(
    host: "localhost",
    port: "6379",
    db: 0
  )
