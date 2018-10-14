const data = {
    data: {
        userInfo: {
            isLogin: true
        }
    }
}
const rrr = data.data && data.data.userInfo && data.data.userInfo.isLogin || false;


function noop() {}
const aaa = { q: { w: 999 } };
const bbb = (aaa?.q?.a ?? noop)(123);
