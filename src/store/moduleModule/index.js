export default{
    namespaced: true,
    state(){
        return {
            sticks: ["默认(0)", "推荐(1)", "置顶(2)"],
            pageList: [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2000, 5000, 8000],
            shows: ["显示(1)", "隐藏(0)"],
            originals: ["原创(1)", "非原创(0)"],
            newsDrops: [    
                "批量显示",
                "批量隐藏",
                "批量推荐置顶-默认",
                "批量推荐置顶-推荐",
                "批量推荐置顶-置顶",
                "批量内测",
                "批量取消内测",
                "批量原创",
                "批量取消原创",
              ],
              messagesDrops: [
                "审核",
                "通过",
                "封杀",
                "黑名单",
                "批量显示",
                "批量隐藏",
              ],
              Friendsdrops: [
                "审核",
                "通过",
                "封杀",
                "批量显示",
                "批量隐藏",
              ],
            items: ["有(Y)", "无(N)"],
            tests: ["非内测(0)", "内测(1)"],
            handles: ["android","ipad", "iphone", "ipod","linux","macintosh","other","unix","windows"],
            states: ["待审(0)", "通过(1)", "封杀(2)","黑名单(3)"],
        }
    },
    mutations: {
        
        //--------mutations--------
        ADD_SUM(state, value){
          state.sum += value;
        },
        //--------actions--------
        CHANGE_MSG(state, value){
            state.msg = value;
        }
    },
    actions: {
        //--------actions--------
        changeMsg({commit},msg){
            setTimeout(() => {
              commit("CHANGE_MSG",msg)
            }, 1000);
        }
    },
    getters: {
        tenYearsOld(state){
            return state.age + 10;
        },
    }
}