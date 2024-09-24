import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { db } from './App';

const fetchRecipes = async () => {
  const recipesCollection = collection(db, 'recipes');
  const recipesSnapshot = await getDocs(recipesCollection);
  console.log('DBへのREADが走りました');
  return recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), name: doc.data().name }));
};

const Home = () => {
  const {
    data: recipes,
    error,
    isLoading,
  } = useSWR('firestore/recipes', fetchRecipes, {
    // refreshInterval: 3000, // 3秒ごとに自動更新
    // revalidateOnFocus: false, // フォーカス時の再検証を無効化
    // dedupingInterval: 2000, // 2秒間は重複リクエストを防ぐ
    // revalidateOnReconnect: false, // 再接続時の再検証を無効化
    revalidateIfStale: false, // ステール時の再検証を無効化
  });

  if (isLoading) return <div>ローディング</div>;

  if (error) {
    console.log(error);
    return <div>エラーが発生しました</div>;
  }
  if (!recipes) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>レシピ一覧</h1>
      <div className="card">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link to="/about">{recipe.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
