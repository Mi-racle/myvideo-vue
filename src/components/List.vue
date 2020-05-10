<template>
    <div class="example-full">
        <h1 id="example-title" class="example-title">Video List</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
                <tbody>
                    <tr v-if="!files.length">
                        <td colspan="7">
                            <div class="text-center p-5">
                                <h4>No video has been uploaded.</h4>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(file) in files" :key="file.id">
                        <div v-if="file.success==true">
                            <td>
                                <div class="filename">
                                    {{file.name}}
                                </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" @click.prevent="onViewVideoShow(file)">
                                        View
                                    </button>
                                </div>
                            </td>
                        </div>
                    </tr>
                </tbody>
            </thead>
        </table>

        <div :class="{'modal-backdrop': true, 'fade': true, show: viewVideoShow}"></div>
        <div :class="{modal: true, fade: true, show: viewVideoShow}" id="modal-edit-file" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Video</h5>
                        <button type="button" class="close"  @click.prevent="viewVideoShow = false">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="video-js">
                            <video-player class="video-player vjs-custom-skin"
                                ref="videoPlayer" 
                                :playsinline="true" 
                                :options="playerOptions"
                            ></video-player>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click.prevent="viewVideoShow = false">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'ListComponent',

  computed: mapGetters({
    files: 'getFiles'
  }),

  data() {
    return {
      curfile: null,
      curpath: './',
      viewVideoShow: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: true, // 如果true，浏览器准备好时开始播放
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 是否视频一结束就重新开始
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: false, // 暂停和播放键
          progressControl: false, // 进度条
          fullscreenToggle: true // 全屏按钮
        },
        sources: [{
          type: 'video/mp4',
          src: require('../resources/1.mp4'), // 视频地址-改变它的值播放的视频会改变
          // type: 'application/x-mpegURL'
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
    }
  },

  watch: {
    'viewVideoShow'(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
      }
    }
  },

  methods: {
    onViewVideoShow(file) {
      this.viewVideoShow = true
      this.curfile = file
      if (this.curfile) {
        this.curpath = './' + this.curfile.name
      }
    },
  }
}
</script>

<style>
.example-full .btn-group .dropdown-menu {
  display: block;
  visibility: hidden;
  transition: all .2s
}
.example-full .btn-group:hover > .dropdown-menu {
  visibility: visible;
}

.example-full label.dropdown-item {
  margin-bottom: 0;
}

.example-full .btn-group .dropdown-toggle {
  margin-right: .6rem
}



.example-full .filename {
  margin-bottom: .3rem
}

.example-full .btn-is-option {
  margin-top: 0.25rem;
}
.example-full .example-foorer {
  padding: .5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}


.example-full .edit-image img {
  max-width: 100%;
}

.example-full .edit-image-tool {
  margin-top: .6rem;
}

.example-full .edit-image-tool .btn-group{
  margin-right: .6rem;
}

.example-full .footer-status {
  padding-top: .4rem;
}

.example-full .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}

.example-full .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>