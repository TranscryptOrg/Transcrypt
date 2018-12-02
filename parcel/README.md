Plugin for transpiling python using the Transcrypt engine that
supports writing your browser scripts using the Python language and
then transpiling and bundling with Parcel.

See the `transcrypt/parcel/example/` directory for an example.

## Testing this package

1. Install npm from http://npmjs.org

2. Install dependencies

```
cd transcrypt/parcel/
npm install
```

3. Symlink the transcrypt local npm repo within `node_modules`.

```
cd transcrypt/parcel/
ln -s ../../npm node_modules/transcrypt
```

4. Run the testing server

```
cd transcrypt/parcel/
export PYTHONPATH=/path/to/transcrypt/on/your/dev/machine/
npm run test
[ then take a browser to localhost:8000 ]
[ and check for output in the console ]
```

5. To rebuild the npm local repo (beacuse of changes to the modules):

```
cd transcrypt/npm/
npm run build
```
