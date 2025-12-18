const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const calcSum = (sum, value) => {
    return sum + value.likes;
  };
  return blogPosts.reduce(calcSum, 0);
};

const favoriteBlog = (blogs) => {
  const Max = (prevMax, value) =>
    value.likes > prevMax ? value.likes : prevMax;
  return blogs.reduce(Max, 0);
};

const listHelper = { dummy, totalLikes, favoriteBlog };

export default listHelper;
