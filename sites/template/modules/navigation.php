<nav id="main-nav" class="two thirds column omega">
    <ul id="main-nav-menu" class="nav-menu">
        <li id="menu-item-1" class="<?php echo($_SERVER['QUERY_STRING'] == "" ? "current" : "");?>">
            <a href="index.php">Home</a>
        </li>
        <li id="menu-item-2" class="<?php echo($_SERVER['QUERY_STRING'] == "site=socketTest" ? "current" : "");?>">
            <a href="index.php?site=socketTest">Sockettest</a>
        </li>
    </ul>
</nav>