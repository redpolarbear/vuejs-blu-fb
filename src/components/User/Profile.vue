<template>
  <div class="container profile">
    <div class="section profile-heading">
      <div class="columns">
        <div class="column is-2">
          <div class="image is-128x128 avatar">
            <img src="https://placehold.it/256x256">
          </div>
        </div>
        <div class="column is-4 name">
          <p>
            <span class="title is-bold">John Smith</span>
            <span class="button is-primary is-outlined follow">Follow</span>
          </p>
          <p class="tagline">The users profile bio would go here, of course. It could be two lines</p>
        </div>
        <div class="column is-2 followers has-text-centered">
          <p class="stat-val">129k</p>
          <p class="stat-key">followers</p>
        </div>
        <div class="column is-2 following has-text-centered">
          <p class="stat-val">2k</p>
          <p class="stat-key">following</p>
        </div>
        <div class="column is-2 likes has-text-centered">
          <p class="stat-val">29</p>
          <p class="stat-key">likes</p>
        </div>
      </div>
    </div>
    <div class="profile-options">
      <div class="tabs is-fullwidth">
        <ul>
          <li class="link is-active"><a><span class="icon"><i class="fa fa-list"></i></span> <span>My Lists</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Likes</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-th"></i></span> <span>My Posts</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-bookmark"></i></span> <span>My Bookmarks</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container.profile {
  margin-top: 50px
}
.profile-heading {
  margin: 20px 0;
  padding-bottom: 30px;
}
.section {
  background-color: #fff;
  padding: 40px 20px;
}
.avatar {
  float: right;
}
.avatar img {
  border-radius: 200px;
}
.profile-heading .name {
  border-right: 1px solid #f1f1f1;
  margin: -30px 0;
  padding: 40px 30px 0 30px;
}
.profile-heading .followers, 
.profile-heading .following {
  border-right: 1px solid #f1f1f1;
  margin: -30px 0;
  padding: 70px 30px;
}
.profile-heading .likes {
  margin: -30px 0;
  padding: 70px 30px;
}
.follow {
  float: right;
}
.tagline {
  padding: 20px 0;
  font-size: 16px;
  line-height: 1.4;
}
.profile-heading .stat-val {
  font-size: 35px;
  font-weight: bold;
}
.profile-heading .stat-key {
  font-size: 20px;
  font-weight: 200;
}
</style>
