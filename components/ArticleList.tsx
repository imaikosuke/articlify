interface Article {
  id: number;
  url: string;
  title: string;
  content: string;
  createdAt: string;
}

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onArticleClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex border-b py-2 font-bold">
        <div className="w-1/3">
          <span>Date</span>
        </div>
        <div className="w-2/3">
          <span>Title</span>
        </div>
      </div>
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex border-b py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => onArticleClick(article)}
        >
          <div className="w-1/3">
            <span className="text-gray-600">{article.createdAt}</span>
          </div>
          <div className="w-2/3">
            <span className="text-blue-500 hover:underline">{article.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
