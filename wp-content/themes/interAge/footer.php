<?php
/*
Template Name: Footer
*/
?>
        </div><!-- .site-content -->

        <footer id="colophon" class="site-footer" role="contentinfo">
            <div class="footer-aling">
                <div class="title">
                    <?php $my_query = new WP_Query('p=419'); ?>
                        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <h1 class="footer-title"><?php the_title(); ?></h1>
                    <?php endwhile; ?>
                </div>
                <div class="footer-content">
                    <div class="conte1">
                        <?php $my_query = new WP_Query('p=426'); ?>
                        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" class="img-responsive" />
                        <?php the_excerpt(); ?>
                        <a href="<?php the_permalink(); ?>"><?php the_meta(); ?></a>
                    <?php endwhile; ?>
                    </div>
                    <div class="conte2">Content 2</div>
                </div>
                <div class="copyright">&copy <span class="entry-date"><?php echo get_the_date(Y); ?></span> Consultoria em Gerontologia Ltda. Todos os Direitos Reservados.</div>
            </div>
        </footer><!-- .site-footer -->
    </div><!-- .site-inner -->
</div><!-- .site -->
</body>
</html>


