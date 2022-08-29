import { GetStaticProps } from "next";
import axios from "axios";

type List = {
  LIST_NM: string;
  VW_CD: string;
  VW_NM: string;
};

type Response = {
  data: List[];
};

const kosis = ({ data }: Response) => {
  return (
    <div className={"m-auto max-w-screen-sm h-[calc(50vh)] overflow-auto"}>
      <div className={"sticky top-0 bg-white"}>
        <h1>통계목록</h1>
        <div>총 개수 : {data.length}</div>
      </div>

      {data.map((el) => (
        <div className={"my-10 border-1 border-black pl-10"} key={el.LIST_NM}>
          <div>
            <strong>{el.LIST_NM}</strong>
          </div>
          <div>{el.VW_NM}</div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, status } = await axios.get<Response>(
    "https://kosis.kr/openapi/statisticsList.do?method=getList&apiKey=MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=&vwCd=MT_ZTITLE&parentListId=J1&format=json&jsonVD=Y&version=v2_1"
  );

  return {
    props: {
      data,
    },
  };
};

export default kosis;
