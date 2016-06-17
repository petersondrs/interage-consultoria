<?php
/*
Template Name: Links
*/
?>
<?php get_header(); ?>
<article class="list-style">
    <?php $my_query = new WP_Query('p=222'); ?>
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
        <h1 class="page-title"><?php the_title(); ?></h1>
        <?php the_content (); ?>
    <?php endwhile; ?>
</article>

<?php get_footer(); ?>