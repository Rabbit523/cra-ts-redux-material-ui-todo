// prettier-ignore
import React, { useState } from "react"
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es"
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	TextField,
	FormControl,
	FormControlLabel,
	Input,
	InputLabel,
	Checkbox,
	Select,
	MenuItem,
	ListItemText
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useActions } from "../actions"
import { Movie } from "../model/todo"
import * as TodoActions from "../actions/todo"
interface Props {
	open: boolean
	onClose: () => void
}

function isEmpty(obj: any) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false
	}
	return true
}

const genders = [
  'Terror',
  'Thriller',
  'Comedia',
  'Rom´antica',
]
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export function TodoDialog(props: Props) {
	const { open, onClose } = props
	const [newTodo, setNewTodo] = useState<Movie>()
	const [newGender, setGender] = useState<string[]>([])
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
	const todoActions = useActions(TodoActions)
	const classes = useStyles()

	const handleClose = () => {
		if (selectedDate && newTodo) {
			newTodo.released = selectedDate.toLocaleDateString()
		}
		if (newGender.length > 0 && newTodo) {
			newTodo.gender = newGender
		}
		newTodo && newTodo.title && todoActions.addTodo({
			id: Math.random(),
			completed: false,
			item: newTodo,
		})
		onClose()

		// reset todo text if user reopens the dialog
		const emptyTodo = {} as Movie
		setNewTodo(emptyTodo)
	}

	const handleChange = (event: any, field: string) => {
		const temp: any = { ...newTodo }
		temp[field] = field !== 'checked' ? event.target.value : event.target.checked
		setNewTodo(temp)
	}

	const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string[])
	}

	const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
			<DialogTitle>Agregar una nueva película</DialogTitle>
			<TextField
				label="Título"
				inputProps={{ maxLength: 25 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'title')}
				className={classes.textField}
			/>
			<TextField
				label="Portada"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'src')}
				className={classes.textField}
			/>
			<FormControl className={classes.formControl}>
				<InputLabel>Género</InputLabel>
				<Select
					multiple
					value={newGender}
					onChange={handleGenderChange}
					input={<Input />}
					renderValue={(selected) => (selected as string[]).join(', ')}
					MenuProps={MenuProps}
				>
					{genders.map((gender) => (
						<MenuItem key={gender} value={gender}>
							<Checkbox checked={newGender.indexOf(gender) > -1} />
							<ListItemText primary={gender} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
				<DatePicker
					disableToolbar
					variant="inline"
					format="MM/dd/yyyy"
					margin="normal"
					label="Año"
					maxDate={new Date(`${new Date().getFullYear()}-12-31`)}
					value={selectedDate}
					onChange={handleDateChange}
					className={classes.textField}
				/>
			</MuiPickersUtilsProvider>
			<TextField
				label="Director"
				inputProps={{ maxLength: 20 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'director')}
				className={classes.textField}
			/>
			<TextField
				label="Sinopsis"
				multiline
				inputProps={{ maxLength: 250 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'description')}
				className={classes.textField}
			/>
			<FormControlLabel
				control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'checked')} name="checkedA" />}
				label="18 +"
				className={classes.checkField}
			/>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={handleClose}>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const useStyles = makeStyles({
	textField: {
		margin: 20,
	},
	checkField: {
		margin: 10
	},
	formControl: {
		margin: 20,
		minWidth: 120,
	},
})
