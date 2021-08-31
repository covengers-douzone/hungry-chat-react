export const headCountAction = (no ) => ({ // 제일 처음에 방 들어 왔을때 send 메시지를 보낼때  headcount수를 알아야 해서 사용했다.
    type: 'HEAD_COUNT',
    no
});
