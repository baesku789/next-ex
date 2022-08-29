import { Client } from '@notionhq/client';

function Todo({ todos }) {
	const Todo = ({ title, created_time, status }) => {
		return (
			<>
				<div>{title}</div>
				<div>{created_time}</div>
				<div>{status}</div>
			</>
		);
	};

	return (
		<>
			{todos.map((todo, index) => {
				const { properties } = todo;
				const created_time = properties['등록시간'].id;
				const status = properties['상태'].id;
				const title = properties['할일'].title;

				return (
					<Todo
						key={index}
						title={title}
						status={status}
						created_time={created_time}
					/>
				);
			})}
		</>
	);
}

// This function gets called at build time
export async function getStaticProps() {
	const notion = new Client({ auth: process.env.NOTION_KEY });

	const databaseId = process.env.NOTION_TODO_DATABASE_ID;

	// Call an external API endpoint to get todos
	const response = await notion.databases.query({ database_id: databaseId });

	const todos = response.results;

	return {
		props: {
			todos,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At mos once every 10 seconds
		revalidates: 10, // In seconds
	};
}

export default Todo;
