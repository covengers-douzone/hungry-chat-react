const coinRandomCreate =  (entities, { input }) => {
    //-- I'm choosing to update the  state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the  state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED  }};
    //-- That said, it's probably worth considering performance implications in either case.
    const coin = entities["copperCoin"];
    const sliverCoin = entities["silverCoin"];
    const goldCoin = entities["goldCoin"];
    const element = document.getElementById('root');
     const width = window.outerWidth
     const height = element.clientHeight


    setTimeout(async () => {

        let randomX = Math.random() * (width);
        let randomY = Math.random() * (height);
        coin.x = randomX
        coin.y = randomY
         randomX = Math.random() * (width);
         randomY = Math.random() * (height);
        sliverCoin.x = randomX
        sliverCoin.y = randomY
        randomX = Math.random() * (width);
        randomY = Math.random() * (height);
        goldCoin.x = randomX
        goldCoin.y = randomY
        console.log("coinRandomCreate" )
    } , 1000)

    return entities;






};

export { coinRandomCreate };