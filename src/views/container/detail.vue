<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <div class="head">
        <div class="photo">
          <img :src="details.image" alt="">
        </div>
        <div class="info">
          <div class="info-top">
            <div class="title">
              <div class="name">{{details&&details.name}}</div>
              <div class="small">
                <small>{{details&&details.clinicName}}</small>
                <small>{{details&&details.title}}</small>
              </div>
            </div>
            <div class="evaluate">
              <div class="scope">评分: {{details&&details.goodRate}}</div>
              <div class="joins">{{details&&details.fansNum}}人参与</div>
            </div>
          </div>
          <div class="info-bottom">{{details&&details.goodAt === ''?'暂无简介':details&&details.goodAt}}</div>
        </div>
      </div>
      <div class="content">{{details&&details.description === ''?'暂无内容':details&&details.description}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HEADER from '../../components/header';

  export default {
    name: 'detail',
    components: { HEADER },
    computed: mapState({
      details: state => state.linkDoctorView
    }),
    data() {
      return {
        detail: this.$route.params.detail
      }
    }
  }
</script>

<style lang="less" scoped>
.warp {
  height: 100%;
  display: flex;
  .con {
    flex: 1;
    padding: 3%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    .head {
      display: flex;
      flex: 1;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgb(240, 240, 240);
      .photo {
        flex: 1.2;
        display: flex;
        border: 1px solid rgb(240, 240, 240);
        justify-content: center;
        align-items: center;
      }
      .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        .info-top {
          flex: 1;
          display: flex;
          .title {
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            padding: 0.5rem 0;
            padding-left: 5%;
            .name {
              font-size: 1.1rem;
            }
            .small {
              font-size: 0.95rem;
              color: rgb(61, 132, 194);
            }
          }
          .evaluate {
            flex: 1.2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0.5rem 0;
            font-size: 0.75rem;
            .scope {
              color: rgb(244, 200, 138)
            }
            .joins {
              color: rgb(200, 200, 200)
            }
          }
        }
        .info-bottom {
          flex: 1.6;
          display: flex;
          justify-content: flex-start;
          color: rgb(200, 200, 200);
          font-size: 0.9rem;
          padding: 0 5%;
          text-align: left;
        }
      }
    }
    .content {
      display: flex;
      flex: 2;
      padding: 1rem 0.5rem 0 0.5rem;
      color: rgb(150, 150, 150);
      text-align: justify;
      font-size: 0.9rem;
      line-height: 1.4rem;
    }
  }
}
</style>
