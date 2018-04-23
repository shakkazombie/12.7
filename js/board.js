var board = {
    name: 'Kanban Board',
    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },

    $element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Wprowadz nazwe');
        if (columnName == "") { columnName = columnName + "Untitled" }

        if (columnName !== null) {

            $.ajax({

                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: columnName
                },
                success: function(response) {
                    var column = new Column(response.id, columnName); // tworzymy nową instancję klasy Column
                    board.createColumn(column);
                }
            }); //end of ajax request
        }

    });

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: '.card-placeholder',
        dropOnEmpty: true
    }).disableSelection();
}