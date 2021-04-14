import React, { useEffect, useState } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
	const [ devs, setDevs ] = useState([]);
	
	useEffect(() => {
		async function loadDevs(){
			// const response = await api.get('/devs');
			// setDevs(response.data);

			setDevs(
				[
					{
						_id: 1,
						avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
						name: "Matheus Mauricio",
						bio: "Dev na Quattror",
						github_username: "matheusmauricio",
						techs: [
							"PHP", "Laravel", "React"
						]
					},
					{
						_id: 2,
						avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
						name: "Matheus Mauricio",
						bio: "Dev na Quattror",
						github_username: "matheusmauricio",
						techs: [
							"PHP", "Laravel", "React"
						]
					},
					{
						_id: 3,
						avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
						name: "Matheus Mauricio",
						bio: "Dev na Quattror",
						github_username: "matheusmauricio",
						techs: [
							"PHP", "Laravel", "React"
						]
					},
					{
						_id: 4,
						avatar_url: "https://www.techreviews.com.br/wp-content/uploads/2020/04/VZI-0-monitor-hd-davidx-rq7e1qwspey-unsplash-scaled.jpg",
						name: "Matheus Mauricio",
						bio: "Dev na Quattror",
						github_username: "matheusmauricio",
						techs: [
							"PHP", "Laravel", "React"
						]
					},
				]
			);
		}

		loadDevs();
	}, []);

	async function handleAddDev(data){
		// const response = await api.post('/devs', data);
		// setDevs([...devs, response.data]);

		setDevs(
			[
				...devs,
				{
					_id: 5,
					avatar_url: "https://github.githubassets.com/images/modules/open_graph/github-mark.png",
					name: "Matheus Mauricio",
					bio: "Dev na Quattror",
					github_username: "matheusmauricio",
					techs: data.techs.split(', ')
				}
			]
		);
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				<DevForm onSubmit={handleAddDev} />
			</aside>

			<main>
				<ul>
				{ devs.map(dev => (
					<DevItem key={dev._id} dev={dev} />
				)) }
				</ul>
			</main>
		</div>
	);
}

export default App;
