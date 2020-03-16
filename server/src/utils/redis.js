import redis from 'redis';
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

export const getList = (list) => new Promise((resolve, reject) => {
  client.lrange(list, 0, -1, function(err, list) {
    if (err) reject(err);
    resolve(list)
  });
})

export const addItemToList = (list, item, callback) => {
  if (typeof item === 'object') {
    const formattedItem = JSON.stringify(item);
    return client.rpush([list, formattedItem], callback);
  }
  return client.rpush([list, item], callback);
}

export const getListLength = (list, callback) => client.llen(list, callback);

export const getItem = (key) => new Promise((resolve, reject) => {
  client.get(key, (err, result) => {
    if (err) reject(err);
    resolve(result);
  })
})

export default client;
