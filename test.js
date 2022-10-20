var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
imgUrl = '';

for(let i in [1,2,3,4,5,6]){
    imgUrl += possible[(Math.floor(Math.random() * possible.length))]
}

console.log(imgUrl);


// console.log(Math.floor(Math.random() * possible.length))