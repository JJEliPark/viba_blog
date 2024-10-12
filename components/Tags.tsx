const Tags = () => {
  const tags = [
    "tech",
    "recruitment",
    "career",
    "kakao",
    "new-crew",
    "conference",
    "meetup",
    "developer",
    "ai",
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {tags.map((tag) => (
        <button
          key={tag}
          className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
