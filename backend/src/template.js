module.exports = (obj, tasks) => {
	let result = `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<style>
			.plan-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				font-size: 18px;
				line-height: 24px;
				}
			.plan-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
				}
			.plan-box table td {
				padding: 5px;
				vertical-align: top;
			}
			.plan-box .table-element td {
				width: 50%;
			}
			.right-float {
				float: right;
			}
			.logo {
				width: 50%;
				max-width: 100px;
			}
			.plan-box .task-box {
				padding: 15px;
				margin: auto;
				border: 1px solid rgba(161, 215, 96, 0.3);
			}
		</style>
	</head>
	<body>
		<div class="plan-box">
			<table>
					<tr>
						<td>
							<img class='logo' src="https://www.greenatom.ru/upload/iblock/65a/65af64c028b740876373ff80bce660a6.gif">
						</td>
						<td class='right-float'>
							<h1>План адаптации</h1>
							Создан ${obj.date_creation}
						</td>
					</tr>
				</table>
				<br>
				<table cellpadding="0" cellspacing="0" class="table-element">
					<tr>
						<td>ФИО сотрудника</td>
						<td>${obj.name}</td>
					</tr>
					<tr>
						<td>Должность</td>
						<td>${obj.position}</td>
					</tr>
					<tr>
						<td>Руководитель</td>
						<td>${obj.super}</td>
					</tr>
					<tr>
						<td>HR-менеджер</td>
						<td>${obj.hr}</td>
					</tr>
					<tr>
						<td>Период</td>
						<td>${obj.date_start} - ${obj.date_end}</td>
					</tr>
					<tr>
						<td>Этап</td>
						<td>${obj.step}</td>
					</tr>
					<tr>
						<td>Итог</td>
						<td>${obj.result}</td>
					</tr>
					<tr>
						<td>Оценка</td>
						<td>${obj.grade}</td>
					</tr>
			</table>
			<br>
`
	if (tasks) {
		result = result.concat('<h2>Задачи</h2>');
		let index = 1
		tasks.forEach(task => {
			result += `
				<div class='task-box'>
					<table cellpadding="0" cellspacing="0" class="table-element">
						<tr>
							<td><b>${index}. ${task.name}</b></td>
						</tr>
						<tr>
							<td>Создана</td>
							<td>${task.date_creation}</td>
						</tr>
						<tr>
							<td>Период</td>
							<td>${task.date_start} - ${task.date_end}</td>
						</tr>
						<tr>
							<td>Итог</td>
							<td>${task.result}</td>
						</tr>
					</table>
					<h3>Содержание</h3>
					<p>${task.content}</p>
				</div>
				<br>
			`
			index++
		})
	}
	result += `
		</div>
	</body>
</html>`
	return result;
};
