document.addEventListener('DOMContentLoaded', function() {
        const triggers = document.querySelectorAll('.sd2-acc-trigger');
        const items = document.querySelectorAll('.sd2-acc-item');

        function closeAllItems() {
            items.forEach(item => {
                item.classList.remove('sd2-active');
                item.querySelector('.sd2-acc-panel').style.maxHeight = null;
            });
        }

        function openItem(item) {
            item.classList.add('sd2-active');
            const panel = item.querySelector('.sd2-acc-panel');
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const parentItem = this.closest('.sd2-acc-item');
                const isActive = parentItem.classList.contains('sd2-active');

                // Close all first to create the accordion effect (only one open at a time)
                closeAllItems();

                // If it wasn't active before click, open it now. 
                // If it was active, it remains closed due to closeAllItems() call above.
                if (!isActive) {
                    openItem(parentItem);
                }
            });
        });

        // Initialize: Open the item that has the 'sd2-active' class hardcoded in HTML
        const initialActiveItem = document.querySelector('.sd2-acc-item.sd2-active');
        if (initialActiveItem) {
            openItem(initialActiveItem);
        }
    });