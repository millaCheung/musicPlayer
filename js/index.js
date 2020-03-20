window.addEventListener("load", function () {
    var app = new Vue({
        el: "#player",
        data: {
            query: "",
            musicList: [],
            musicUrl: "",
            picUrl: "",
            hotComments: [],
            isPlaying: false,
            mvUrl: "",
            isShow: false
        },
        methods: {
            // 歌曲搜索
            searchMusic: function () {
                var that = this;
                axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                    .then(function (response) {
                        that.musicList = response.data.result.songs;
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            // 播放歌曲
            playMusic: function (musicId) {
                var that = this;
                // 获取歌曲地址
                axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                    .then(function (response) {
                        that.musicUrl = response.data.data[0].url;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                // 获取歌曲详细信息
                axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                    .then(function (response) {
                        that.picUrl = response.data.songs[0].al.picUrl;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                // 歌曲评论获取
                axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                    .then(function (response) {
                        that.hotComments = response.data.hotComments;
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            },
            // 歌曲播放
            play: function () {
                this.isPlaying = true;
            },
            // 歌曲暂停
            pause: function () {
                this.isPlaying = false;
            },
            // 播放MV
            playMV: function (mvid) {
                var that = this;
                axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                    .then(function (response) {
                        that.isShow = true;
                        that.mvUrl = response.data.data.url;
                        console.log(that.mvUrl)
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            // 隐藏MV
            hide: function () {
                this.isShow = false;
            }

        }
    })
});