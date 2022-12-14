function checkedAllcheckboxOfReport(reportId, collection) {

	document.querySelector('#' + reportId).addEventListener('click', function (e) {

		if (e.target.type === 'checkbox' && e.target.closest('th')) {

			let allInputsCheckbox = this.querySelectorAll('tbody tr td:first-child input[type="checkbox"]');

			for (let i = 0; i < allInputsCheckbox.length; i++) {
				
				checkedCheckbox(allInputsCheckbox[i], e.target.checked);
			}	

		} else if (e.target.type === 'checkbox' && e.target.closest('td')) {

			checkedCheckbox(e.target, e.target.checked);

		}

		function checkedCheckbox(inputCheckbox, isChecked) {

			let obj = {
				'documentID': inputCheckbox.value,
				'collection': collection
			}

			if (isChecked) {
				addElementCollection(obj);
				inputCheckbox.checked = !0;

				let allBodyCheckbox = inputCheckbox.closest('table').querySelectorAll('td:first-child input[type="checkbox"]');
				let isAllChecked = true;

				for (let t = 0; t < allBodyCheckbox.length; t++) {

					if (!allBodyCheckbox[t].checked) {

						isAllChecked = false;

					}
				}	

				if(isAllChecked) {

					let arrAllHeaderCheckbox = document.querySelectorAll('.checkAllReportCollection');

					for (let z = 0; z < arrAllHeaderCheckbox.length; z++) {
						arrAllHeaderCheckbox[z].checked = !0;
					}
				}
			
			} else {
				deleteElementCollection(obj);
				inputCheckbox.checked = !!0;

				let arrAllHeaderCheckbox = document.querySelectorAll('.checkAllReportCollection');

				for (let z = 0; z < arrAllHeaderCheckbox.length; z++) {
					arrAllHeaderCheckbox[z].checked = !!0;
				}		
			}
		}
	});

	function addElementCollection(obj){

		apex.server.process(
			'ADD_ELEMENT_COLLECTION', {
			x01: obj.documentID,
			x02: obj.collection
		}, {
			success: function (request) {
				if (request == 200) {

				} else {
					apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message: request,
						unsafe: false
					}]);
				}
			},
			error: function (pjqXHR, pTextStatus, pErrorThrown){
				console.log("error: " + pErrorThrown);
			},
			dataType: "text",
			async: false
		});
	};

	function deleteElementCollection(obj) {

		apex.server.process(
			'DELETE_ELEMENT_COLLECTION', {
			x01: obj.documentID,
			x02: obj.collection
		}, {
			success: function (request) {
				if (request == 200) {

				} else {
					apex.message.clearErrors();
					apex.message.showErrors([{
						type: "error",
						location: "page",
						message: request,
						unsafe: false
					}]);

				}
			},
			error: function (pjqXHR, pTextStatus, pErrorThrown) {
				console.log("error: " + pErrorThrown);
			},
			dataType: "text",
			async: false
		});
	};
}