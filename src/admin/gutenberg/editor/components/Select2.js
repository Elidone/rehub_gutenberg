import ReactSelect2Wrapper from 'react-select2-wrapper';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {boundMethod} from 'autobind-decorator';

import {BaseControl} from "@wordpress/components";

class Select2 extends React.Component {
	static defaultProps = {
		value: '',
		onChange: () => {
		},
		data: [],
		rest: false,
		restPath: '',
		multiple: false,
		select2Options: {},
		label: '',
		// post_type: 'post',
	};

	static propTypes = {
		value: PropTypes.any,
		onChange: PropTypes.func,
		data: PropTypes.any,
		rest: PropTypes.bool,
		restPath: PropTypes.string,
		multiple: PropTypes.bool,
		select2Options: PropTypes.object,
		label: PropTypes.string,
		post_type: PropTypes.any,
	};

	state = {
		data: this.props.data,
		loaded: !this.props.rest,
	};

	componentDidMount() {
		this.props.rest && wp.apiFetch({
			path: this.props.restPath,
			method: 'POST',
			data: {
				post_type: this.props.post_type,
				typeQuery: 'select2',
				include: this.props.value
			}
		})
			.then(({results: data}) => this.setState({data, loaded: true}))
			.catch(() => this.setState({data: [], loaded: true}))
	}

	@boundMethod
	promiseOptions(params, success, failure) {
		const {
			restPath: path,
			post_type,
		} = this.props;

		const {
			data
		} = params;

		wp.apiFetch({
			path: path,
			method: 'POST',
			data: {
				s: data.q,
				post_type: post_type,
				typeQuery: 'select2',
				...data
			}
		})
			.then(success)
			.catch(failure)
	}

	render() {
		const {
			value,
			onChange,
			options,
			multiple,
			rest,
			label,
		} = this.props;

		const {
			data,
			loaded
		} = this.state;

		const select2options = {
			width: '100%',
			...(rest ? {
				closeOnSelect: !multiple,
				ajax: {
					dataType: 'json',
					delay: 250,
					transport: this.promiseOptions
				},
				minimumInputLength: 0,
			} : {}),
			...options,
		};

		return <>
			<BaseControl
				label={label}
			>
				<ReactSelect2Wrapper
					value={value}
					data={data}
					multiple={multiple}
					options={select2options}
					onChange={(event) => {
						let value = jQuery(event.currentTarget).val() === null ? (multiple ? [] : '') : jQuery(event.currentTarget).val();
						onChange(multiple ? value.filter((val) => val.length) : value)
					}}
				/>
			</BaseControl>
		</>
	}

}


export default Select2;
