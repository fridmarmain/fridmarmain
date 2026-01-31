// deskStructure.js
export const structure = (S) =>
  S.list()
    .title('Fridmar Law')
    .items([
      // This creates a standard list but adds a 'Filter' capability
      S.listItem()
        .title('All Practice Areas')
        .child(
          S.documentTypeList('practiceArea')
            .title('All Pages')
            // This sorts the list by level first, then title
            // Umbrellas first, then Categories, then Services
            .defaultOrdering([
              {field: 'level', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),

      S.divider(),

      // Filtered views for quick access
      S.listItem()
        .title('Filter by Level')
        .child(
          S.list()
            .title('Levels')
            .items([
              S.listItem()
                .title('🟦 Umbrellas')
                .child(
                  S.documentList()
                    .title('Umbrellas')
                    .filter('_type == "practiceArea" && level == "umbrella"'),
                ),
              S.listItem()
                .title('🟨 Categories')
                .child(
                  S.documentList()
                    .title('Categories')
                    .filter('_type == "practiceArea" && level == "category"'),
                ),
              S.listItem()
                .title('📄 Services')
                .child(
                  S.documentList()
                    .title('Services')
                    .filter('_type == "practiceArea" && level == "service"'),
                ),
            ]),
        ),

      // Include your other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['practiceArea'].includes(listItem.getId()),
      ),
    ])
