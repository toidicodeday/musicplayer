const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const cd = $('.cd');
const cdWidth = cd.offsetWidth;
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');
const vnBtn = $('.vn-songs');
const enBtn = $('.en-songs');
const loveBtn = $('.love-songs');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentList: 'vn',
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: {
        vn: [{
                name: '3107-2',
                single: 'Duong, NauWn',
                path: './assets/music/song1.mp3',
                image: './assets/img/song1.jpg'
            },
            {
                name: 'Chúng Ta Sau Này',
                single: 'T.R.I',
                path: './assets/music/song2.mp3',
                image: './assets/img/song2.jpg'
            },
            {
                name: 'Đế Vương',
                single: 'Đình Dũng, ACV',
                path: './assets/music/song3.mp3',
                image: './assets/img/song3.jpg'
            },
            {
                name: 'Gác Lại Âu Lo',
                single: 'Da LAB ft.Miu Lê',
                path: './assets/music/song4.mp3',
                image: './assets/img/song4.jpg'
            },
            {
                name: 'Lời Nói Điêu Trên Môi Em',
                single: 'Đỗ Nguyên Phúc',
                path: './assets/music/song5.mp3',
                image: './assets/img/song5.jpg'
            },
            {
                name: 'Lỡ Say Bye Là Bye',
                single: 'Lemese, Changg',
                path: './assets/music/song6.mp3',
                image: './assets/img/song6.jpg'
            },
            {
                name: 'Một Mình Có Buồn Không',
                single: 'Thiều Bảo Trâm',
                path: './assets/music/song7.mp3',
                image: './assets/img/song7.jpg'
            },
            {
                name: 'Muộn Rồi Mà Sao Còn',
                single: 'Sơn Tùng M-TP',
                path: './assets/music/song8.mp3',
                image: './assets/img/song8.jpg'
            },
            {
                name: 'Răng Khôn',
                single: 'Phí Phương Anh',
                path: './assets/music/song9.mp3',
                image: './assets/img/song9.jpg'
            },
            {
                name: 'Sài Gòn Đau Lòng Quá',
                single: 'Hứa Kim Tuyền, Hoàng Duyên',
                path: './assets/music/song10.mp3',
                image: './assets/img/song10.jpg'
            }
        ],
        us: [{
                name: 'Unstoppable',
                single: 'Sia',
                path: './assets/music/song11.mp3',
                image: './assets/img/song11.jpg'
            },
            {
                name: 'Fly Away',
                single: 'TheFatrat',
                path: './assets/music/song12.mp3',
                image: './assets/img/song12.jpg'
            },
            {
                name: 'Vicestone',
                single: 'Nevada ft Cozi Zuehlsdorff',
                path: './assets/music/song13.mp3',
                image: './assets/img/song13.jpg'
            },
            {
                name: 'Waiting For Love',
                single: 'Avicii',
                path: './assets/music/song14.mp3',
                image: './assets/img/song14.jpg'
            },
            {
                name: 'Girl Like You',
                single: 'Maroon 5',
                path: './assets/music/song15.mp3',
                image: './assets/img/song15.jpg'
            },
            {
                name: 'Reality',
                single: 'Lost Frequencies',
                path: './assets/music/song16.mp3',
                image: './assets/img/song16.jpg'
            },
            {
                name: 'Monsters',
                single: 'Katie Sky',
                path: './assets/music/song17.mp3',
                image: './assets/img/song17.jpg'
            },
            {
                name: 'I Love You 3000',
                single: 'Stephanie Poetri',
                path: './assets/music/song18.mp3',
                image: './assets/img/song18.jpg'
            },
            {
                name: 'Comethru',
                single: 'Jeremy Zucker',
                path: './assets/music/song19.mp3',
                image: './assets/img/song19.jpg'
            },
            {
                name: 'I Want You T Know',
                single: 'Zedd ft. Selena Gomez | Steve James',
                path: './assets/music/song20.mp3',
                image: './assets/img/song20.jpg'
            }
        ],
        love: []
    },

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function() {
        const htmls = this.songs[this.currentList].map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index='${index}'>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.single}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        });
        $('.playlist').innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentList][this.currentIndex];
            }
        })
    },

    handleEvent: function() {
        //  Xử lí cd khi quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 100000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Xử lí phóng to thu nhỏ cd
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop;

                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;

            }
            // Xử lí khi click play
        playBtn.onclick = function() {
                if (app.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
            // khi bài hát được play
        audio.onplay = function() {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
            // Khi bài hát bị pause
        audio.onpause = function() {
                app.isPlaying = false;
                player.classList.remove('playing');
                cdThumbAnimate.pause();
            }
            // khi tiến độ bài hát được thay đổi
        audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                    progress.value = progressPercent;
                }
            }
            // Xử lí khi tua bài hát 
        progress.oninput = function(e) {
                const seekTime = e.target.value * audio.duration / 100;
                audio.currentTime = seekTime;
            }
            // Xử lí khi next bài hát 
        nextBtn.onclick = function() {
                if (app.isRandom) {
                    app.playRandom();
                } else {
                    app.nextSong();
                }
                audio.play();
                app.render();
                app.scrollToActiveSong();
            }
            // Xử lí khi prev bài hát 
        prevBtn.onclick = function() {
                if (app.isRandom) {
                    app.playRandom();
                } else {
                    app.prevSong();
                }
                audio.play();
                app.scrollToActiveSong();
            }
            // Xử lí khi bật / tắt nút random
        randomBtn.onclick = function(e) {
                app.isRandom = !app.isRandom;
                app.setConfig('isRandom', app.isRandom);
                randomBtn.classList.toggle('active', app.isRandom);
            }
            //   xử lý khi kết thúc bài hát 
        audio.onended = function() {
                if (app.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            }
            // Xử lý khi lặp lại 1 bài hát 
        repeatBtn.onclick = function() {
                app.isRepeat = !app.isRepeat;
                repeatBtn.classList.toggle('active', app.isRepeat);
            }
            //  Lắng nghe khi click vào playlist l
        playList.onclick = function(e) {
                // Xử lý khi click vào bài hát
                const songNode = e.target.closest('.song:not(.active)');
                if (songNode || e.target.closest('.option')) {
                    if (songNode) {
                        app.currentIndex = Number(songNode.dataset.index);
                        app.loadCurrentSong();
                        app.render();
                        audio.play();
                    }

                    //    Xử lí khi click vào option bài hát
                    if (e.target.closest('.option')) {
                        alert('Chức năng này đang được xây dựng, vui lòng thử lại sau !!');
                    }
                }
            }
            // Chuyển dổi danh sách bài hát
        vnBtn.onclick = function() {
            enBtn.classList.remove('active');
            loveBtn.classList.remove('active');
            vnBtn.classList.add('active');
            app.currentList = 'vn';
            app.currentIndex = 0;
            app.loadCurrentSong();
            app.render();
            playBtn.click();
            audio.play();
        }
        enBtn.onclick = function() {
            enBtn.classList.add('active');
            loveBtn.classList.remove('active');
            vnBtn.classList.remove('active');
            app.currentList = 'us';
            app.currentIndex = 0;
            app.loadCurrentSong();
            app.render();
            playBtn.click();
            audio.play();
        }
        loveBtn.onclick = function() {
            enBtn.classList.remove('active');
            loveBtn.classList.add('active');
            vnBtn.classList.remove('active');
            alert('Bạn chưa có bài hát yêu thích nào !!');
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs[this.currentList].length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs[this.currentList].length - 1;
        }
        this.loadCurrentSong();
    },

    playRandom: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs[this.currentList].length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300)
    },

    start: function() {
        // Gán cấu hình config vào ứng Dụng
        this.loadConfig();
        // Định nghĩa những thuộc tính cho object
        this.defineProperties();
        // Lắng nghe / Xử lí các sự kiện (DOM event)
        this.handleEvent();
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // Render playlist
        this.render();
        //    Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);

    }
}

app.start();