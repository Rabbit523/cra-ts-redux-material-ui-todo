import React, { useState } from "react"
import { useSelector } from "react-redux"
import { List, ListItem, ListItemAvatar, ListItemText, Collapse, Typography, Avatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { RootState } from "../reducers"
import { Todo } from "../model"
import PlugLogo from '../plus-18-movie.svg'

interface collapseArrayProps {
	id: number
	checked: boolean
}
export function HomePage() {
	const classes = useStyles()
	const todoList = useSelector((state: RootState) => state.todoList)
	const [open, setOpen] = useState<Array<collapseArrayProps>>([])

	const handleClick = (type: number) => {
		const tmp: Array<collapseArrayProps> = [...open]
		const selectedItem = tmp.find((item) => item.id === type)
		if (selectedItem) {
			selectedItem.checked = !selectedItem.checked
			setOpen(tmp)
		} else {
			const item: collapseArrayProps = {id: type, checked: true}
			tmp.push(item)
			setOpen(tmp)
		}
	}

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				¡Tienes {todoList.length} Películas en tu lista!
			</Typography>
			<div className={classes.centerContainer}>
				<List className={classes.list}>
					{todoList.map((n: Todo) => {
						const curCollapse= open.find((item) => item.id === n.id)
						return (
							<ListItem className={classes.item} key={n.id}>
								<div className={classes.itemHeader} onClick={() => handleClick(n.id)}>
									<ListItemText
										primary={
											<React.Fragment>
												<Typography
													component="span"
													variant="subtitle2"
													className={classes.title}
												>
													{n.item.title}
												</Typography>
											</React.Fragment>
										}
										secondary={`${n.item.director}, ${n.item.released}`}
									/>
									{n.item.checked && <ListItemAvatar className={classes.avatarWrapper}>
										<Avatar alt="18+" src={PlugLogo} className={classes.avatar} />
									</ListItemAvatar>}
								</div>
								<Collapse in={curCollapse ? curCollapse.checked : false} timeout="auto" unmountOnExit className={classes.itemBody}>
									<div className={classes.movieWrapper}>
										<img src={n.item.src} alt="cover" className={classes.imgMovie} />
									</div>
									{n.item.description}
								</Collapse>
							</ListItem>
						)
					})}
				</List>
			</div>
		</div>
	)
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		width: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		marginTop: 50,
		display: "flex",
		flexDirection: "column",
	},

	list: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: 'column',
	},

	item: {
		maxWidth: "320px",
		border: "1px solid #575757",
		background: "#d2d2d2",
		textTransform: 'capitalize',
		flexDirection: 'column'
	},

	itemHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},

	itemBody: {
		padding: '15px 0',
	},

	movieWrapper: {
		display: "flex",
		justifyContent: "center",
		marginBottom: 10,
		maxWidth: 300
	},

	imgMovie: {
		maxWidth: "100%",
	},

	title: {
		fontWeight: 'bold',
	},

	avatarWrapper: {
		maxWidth: 56,
		display: "flex",
	},

	avatar: {
		width: "100%",
		height: "100%",
		padding: 5,
	},

	button: {
		marginTop: 20,
	},
})
