// http://localhost:3000/todo

$.noConflict()

jQuery(document).ready(function ($) {
    const URL_API = 'http://localhost:3000/todo'

    // Index
    $.ajax({
        url: URL_API,
        type: 'GET',
        success: function (data) {
            data.forEach((item, index) => {
                $('tbody').append(`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>
                            ${item.description}
                        </td>
                        <td>
                            ${item.status ? "Ok" : ""}
                        </td>
                        <td>

                            ${item.status ? "👹" : `<button class="btn btn-sm btn-success done-task" 
                            data-id="${item.id}"
                            data-name="${item.name} "
                            data-description="${item.description} "
                            data-status="${item.status}">Done</button>`}
                           
                            ${item.status ? "" : `<button class="btn btn-sm btn-danger delete-task" data-id=${item.id}>Delete</button>`}
                        </td>
                    </tr>
                `)
            })
        }
    })

    // Create 
    $('#btn-add').click((event) => {
        event.preventDefault()

        const name = $('#name').val().trim()
        let description = $('#description').val().trim()

        if (name === "") {
            alert('Please enter name')
            return
        }

        $.ajax({
            url: URL_API,
            type: 'POST',
            data: JSON.stringify(
                {
                    name,
                    description,
                    status: false
                }
            ),
            contentType: 'application/json',
            success: function (data) {
                $('tbody').append(
                    `
                    <tr>
                        <td></td>
                        <td>${data.name}</td>
                        <td>${data.description}</td>
                        <td>
                        <button class="btn btn-sm btn-success done-task" 
                            data-id="${item.id}" 
                            data-name="${item.name}"
                            data-description="${item.description}"
                            data-status="${item.status}">Done</button>
                        <button class="btn btn-sm btn-danger delete-task" data-id=${data.id}>Delete</button>
                        </td>
                    </tr>
                    `
                ).hide().fadeIn(900)

                $('#name').val('')
                $('#description').val('')
            }
        })
    })

    // Done
    $(document).on('click', '.done-task', function (event) {
        event.preventDefault()

        let task_id = $(this).data('id')
        let name = $(this).data('name')
        let description = $(this).data('description')
        let status = $(this).data('status')

        console.table(task_id, name, description, status)

        $.ajax({
            url: `${URL_API}/${task_id}`,
            type: 'PUT',
            data: JSON.stringify(
                {
                    name: name,
                    description: description,
                    status: !status
                }
            )
        })
    })

    // Delete
    // $this khong dung` dc trong arrow function
    // co' document vi` chua co san trong dom nen ca`n document de goi khi nhan' vao`
    $(document).on('click', '.delete-task', function (event) {
        event.preventDefault()

        let isConfirm = confirm('Yet sure???')
        let task_id = $(this).data('id')

        if (isConfirm) {
            $.ajax({
                url: `${URL_API}/${task_id}`,
                type: 'DELETE',
            })
        } else {
            alert('Ok khong xoa')
        }
    })
})