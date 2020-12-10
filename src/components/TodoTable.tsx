// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { makeStyles } from "@material-ui/styles"
import * as React from "react"
import { useSelector } from "react-redux"
import { useActions } from "../actions"
import * as TodoActions from "../actions/todo"
import { Todo } from "../model"
import { RootState } from "../reducers"

export function TodoTable() {
	const classes = useStyles()
	const todoList = useSelector((state: RootState) => state.todoList)
	const todoActions = useActions(TodoActions)

	const onRowClick = (todo: Todo) => {
		if (todo.completed) {
			todoActions.uncompleteTodo(todo.id)
		} else {
			todoActions.completeTodo(todo.id)
		}
	}

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Título</TableCell>
						<TableCell padding="default">Año</TableCell>
						<TableCell padding="default">Director</TableCell>
						<TableCell padding="default">Eliminar</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todoList.map((n: Todo) => (
						<TableRow
							key={n.id}
							hover
							onClick={event => onRowClick(n)}
						>
							<TableCell padding="none">
								<Checkbox checked={n.completed} />
							</TableCell>
							<TableCell padding="none">{n.item.title}</TableCell>
							<TableCell padding="none">{n.item.released}</TableCell>
							<TableCell padding="none">{n.item.director}</TableCell>
							<TableCell padding="none">
								<IconButton
									aria-label="Eliminar"
									color="default"
									onClick={() =>
										todoActions.deleteTodo(n.id)
									}
								>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	)
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
})
