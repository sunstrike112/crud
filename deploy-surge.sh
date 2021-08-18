# Build reactjs with Product mode
npm run build

# Move to build folder

cd build

# Clone index.html into 200.html

cp index.html 200.html

# delete .map file in build folder

find -name *.map -delete

# Start deploy Surge

surge . poetaphaptdq.surge.sh