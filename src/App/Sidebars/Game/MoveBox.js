const MoveBox = (entities, { input }) => {
    //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
    //-- That said, it's probably worth considering performance implications in either case.

    const { payload } = input.find(x => x.name === "onMouseDown") || {};

    if (payload) {
        const player = entities["player"];
        player.x = payload.pageX;
        player.y = payload.pageY;
    }
    //  if (payload2) {
    //
    //     const player = entities["player"];
    //      console.log("마우스 이동중 !!")
    //      player.x = payload2.pageX;
    //      player.y = payload2.pageY;
    // }



    return entities;
};

export { MoveBox };